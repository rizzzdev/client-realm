import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Material {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  materialString: string;
  quizId: string;
}

export interface Materials {
  materialLists: Material[];
  currentMaterial: Material;
}

const materialsState: Materials = {
  materialLists: [],
  currentMaterial: {
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    materialString: "",
    quizId: "",
  },
};

const materialsSlice = createSlice({
  name: "materials",
  initialState: materialsState,
  reducers: {
    setMaterials: (
      state: Materials = materialsState,
      action: PayloadAction<Material>
    ) => {
      return {
        ...state,
        materialLists: [...state.materialLists, action.payload],
      };
    },
    setCurrentMaterial: (
      state: Materials = materialsState,
      action: PayloadAction<Material>
    ) => {
      return {
        ...state,
        currentMaterial: action.payload,
      };
    },
    resetMaterials: () => {
      return materialsState;
    },
  },
});

export const { setMaterials, setCurrentMaterial, resetMaterials } =
  materialsSlice.actions;
export const materialsReducer = materialsSlice.reducer;
