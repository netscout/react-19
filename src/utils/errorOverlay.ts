export const onConsoleError = ({
  consoleMessage,
  ownerStack,
}: {
  consoleMessage: string;
  ownerStack: string | null;
}) => {
  const errorDialog = document.getElementById("error-dialog");
  const errorBody = document.getElementById("error-body");
  const errorOwnerStack = document.getElementById("error-owner-stack");

  if (errorBody) {
    // Display console.error() message
    errorBody.innerText = consoleMessage;
  }

  if (errorOwnerStack) {
    // Display owner stack
    errorOwnerStack.innerText = ownerStack ?? "-no owner stack-";
  }

  if (errorDialog) {
    // Show the dialog
    errorDialog.classList.remove("hidden");
  }
};
