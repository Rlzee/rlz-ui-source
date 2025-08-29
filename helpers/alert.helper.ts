import { AlertDialogParams, ALERT_DIALOG_NAME } from "@ui/components/alert-dialog";
import { useDialog } from "@ui/stores/dialog.store";

export function alert(params: AlertDialogParams) {
  const state = useDialog.getState();

  if (!state) {
    console.warn("Dialog store not initialized.");
    return;
  }

  state.openDialog(ALERT_DIALOG_NAME, params);
}

