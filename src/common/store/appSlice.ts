import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EdgeType, NodeType } from 'features/nodeEditor/types';

export type WorkflowState = {
  nodes: Array<NodeType>;
  edges: Array<EdgeType>;
}

export type AppState = {
  header: string;
  workflow: WorkflowState;
}

const initialState: AppState = {
  header: '',
  workflow: {
    nodes: [],
    edges: [],
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHeader: (state, { payload }: PayloadAction<string>) => {
      state.header = payload;
    },
    setWorkflow: (state, { payload }: PayloadAction<WorkflowState>) => {
      state.workflow = payload;
    },
  },
});

export const {
  setHeader,
  setWorkflow,
} = appSlice.actions;

export default appSlice.reducer;
