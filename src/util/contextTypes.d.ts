type ResolvedMainBlock = {
  columns: number;
  content: MinimalElement[];
};

export type ResolvedPageConfig = {
  head: TextBlockElementProps;
  sidebarR: SidebarElementProps;
  sidebarL: SidebarElementProps;
  main: ResolvedMainBlock;
};

export type ResolvedContextConfig = {
  pages: ResolvedPageConfig[];
};

type ElementRef<T extends InputTypes = InputTypes> = {
  type: T;
  entry: string;
  context: string;
};

type MainBlock = {
  columns: number;
  content: ElementRef[];
};

type PageConfig = {
  head: ElementRef<InputTypes.TEXTBLOCK>;
  sidebarR: ElementRef<InputTypes.SIDEBAR>;
  sidebarL: ElementRef<InputTypes.SIDEBAR>;
  main: MainBlock;
};

export type ContextConfig = {
  pages: PageConfig[];
};