import "../css/libraries/nice-select.css";
import "../css/popup.css";

const PopUp = () => {
  return (
    <>
      <div>
        <div id="navigation">
          <div id="logo">
            <img src="../assets/images/popup/popup-logo.svg" />
            Google Meet Record
          </div>
        </div>

        <div id="tabs">
          <div id="recording-type">
            <div id="tab-only" class="type type-active">
              <img src="../assets/images/popup/tab-only-active.svg" />
              <p>Tab only</p>
            </div>
            <div id="desktop" class="type">
              <img src="../assets/images/popup/desktop.svg" />
              <p>Desktop</p>
            </div>
          </div>
        </div>

        <div id="body">
          <label for="mic-select" id="mic-label">
            Microphone
          </label>
          <select id="mic-select">
            <option value="disabled">Disabled</option>
          </select>

          <button id="record" style="margin-top: 10px" class="record-disabled">
            Loading...
          </button>
        </div>
      </div>
    </>
  );
};

export default PopUp;
