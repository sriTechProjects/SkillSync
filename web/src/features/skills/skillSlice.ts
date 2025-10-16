import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";
import type { Skill } from "@/interface/skill";
import type { category } from "@/interface/category";
import type { AppDispatch } from "@/app/store";

// --- State Interface ---
interface SkillState {
  skills: Skill[];
  categories: category[];
  selectedSkill: Skill | null;
  isLoading: boolean;
  error: string | null;
}

// --- Initial State ---
const initialState: SkillState = {
  skills: [],
  categories: [],
  selectedSkill: null,
  isLoading: false,
  error: null,
};

// --- Async Thunks ---

// Fetch all skills
export const fetchSkills = createAsyncThunk<Skill[], void, { rejectValue: string }>(
  "skills/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<Skill[]>("/skills/offered");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch skills.");
    }
  }
);

// Fetch skill by ID
export const fetchSkillById = createAsyncThunk<Skill, string, { rejectValue: string }>(
  "skills/fetchById",
  async (skillId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<Skill>(`/skills/offered/${skillId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch skill details.");
    }
  }
);

// Fetch all categories
export const fetchCategories = createAsyncThunk<category[], void, { rejectValue: string }>(
  "skills/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<category[]>("/categories");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch categories.");
    }
  }
);

// Create a new skill
export const createSkill = createAsyncThunk<
  Skill,
  Partial<Skill>,
  { rejectValue: string; dispatch: AppDispatch }
>(
  "skills/createSkill",
  async (skillData, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiClient.post<Skill>("/skills/offered", skillData);
      // Refresh skills after creating
      dispatch(fetchSkills());
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to create skill.");
    }
  }
);

// Get suggested categories
export const getSuggestions = createAsyncThunk<category[], void, { rejectValue: string }>(
  "category/fetchSuggestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<category[]>("/categories/suggest");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch suggestions.");
    }
  }
);

// Suggest a new category
export const suggestCategory = createAsyncThunk<category, string, { rejectValue: string }>(
  "category/suggestCategory",
  async (name, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<category>("/categories/suggest", { name });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to suggest category.");
    }
  }
);

// --- Slice ---
const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all skills
      .addCase(fetchSkills.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action: PayloadAction<Skill[]>) => {
        state.isLoading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // Fetch skill by ID
      .addCase(fetchSkillById.pending, (state) => {
        state.isLoading = true;
        state.selectedSkill = null;
      })
      .addCase(fetchSkillById.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.isLoading = false;
        state.selectedSkill = action.payload;
      })
      .addCase(fetchSkillById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<category[]>) => {
        state.categories = action.payload;
      })

      // Create skill
      .addCase(createSkill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSkill.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // Suggest category
      .addCase(suggestCategory.fulfilled, (state, action: PayloadAction<category>) => {
        state.categories.push(action.payload);
      })

      // Get suggestions
      .addCase(getSuggestions.fulfilled, (state, action: PayloadAction<category[]>) => {
        state.categories = action.payload;
      });
  },
});

export default skillSlice.reducer;
