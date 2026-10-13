import { getSettings, updateSettings } from "@/lib/actions/settings";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <div className="admin-header">
        <h1>Coordonnées</h1>
      </div>

      <div className="admin-card">
        <SettingsForm settings={settings} action={updateSettings} />
      </div>
    </div>
  );
}
