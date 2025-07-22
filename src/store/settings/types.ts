export type SettingsCategory = "profile" | "appearance" | null;

export interface SettingsState {
  drawerMode: boolean;
  activeCategory: SettingsCategory;
}
