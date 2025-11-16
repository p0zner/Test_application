import type {AppDispatch} from "../store.ts";
import {useDispatch} from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;