import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IImage,
  ILocal,
  IOpeningDays,
} from "../../pages/private/Local/services/Local.service";

const initialState: ILocal = {
  name: "", // Nombre del local vacío
  address: "", // Dirección del local vacía
  phone: "", // Número de teléfono del local vacío
  email: "", // Correo electrónico del local vacío
  openingHours: {
    monday: { isOpen: false, open: "", close: "" }, // Horario del lunes vacío
    tuesday: { isOpen: false, open: "", close: "" }, // Horario del martes vacío
    wednesday: { isOpen: false, open: "", close: "" }, // Horario del miércoles vacío
    thursday: { isOpen: false, open: "", close: "" }, // Horario del jueves vacío
    friday: { isOpen: false, open: "", close: "" }, // Horario del viernes vacío
    saturday: { isOpen: false, open: "", close: "" }, // Horario del sábado vacío
    sunday: { isOpen: false, open: "", close: "" }, // Horario del domingo vacío
  },
  mainImage: { url: "", description: "" }, // Imagen principal vacía
  additionalImages: [], // Lista de imágenes adicionales vacía
  description: "", // Descripción vacía
  services: [], // Lista de servicios vacía
};

export const localSlice = createSlice({
  name: "local",
  initialState: initialState,
  reducers: {
    createLocal: (_state, action: PayloadAction<ILocal>) => {
      return action.payload;
    },
    editLocal: (state, action: PayloadAction<Partial<ILocal>>) => {
      return { ...state, ...action.payload };
    },
    deleteLocal: (_state) => {
      return initialState;
    },
    editOpeningHours: (state, action: PayloadAction<IOpeningDays>) => {
      state.openingHours = action.payload;
    },
    editBasicInfo: (
      state,
      action: PayloadAction<{
        name: string;
        address: string;
        phone: string;
        email: string;
        description: string;
        mainImage: IImage;
      }>
    ) => {
      const { name, address, phone, email, description, mainImage } =
        action.payload;
      state.name = name;
      state.address = address;
      state.phone = phone;
      state.email = email;
      state.description = description;
      state.mainImage = mainImage;
    },
    editAdditionalImages: (state, action: PayloadAction<IImage[]>) => {
      state.additionalImages = action.payload;
    },
    editServices: (state, action: PayloadAction<string[]>) => {
      state.services = action.payload;
    },
  },
});

export const {
  createLocal,
  editLocal,
  deleteLocal,
  editOpeningHours,
  editBasicInfo,
  editAdditionalImages,
  editServices,
} = localSlice.actions;

export default localSlice.reducer;
