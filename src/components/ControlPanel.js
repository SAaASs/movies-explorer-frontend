import React from 'react';
function ControlPanel() {
  const [isSwitchActive, setIsSwitchActive] = React.useState(false);
  return (
    <>
      <section className="control-panel">
        <form className="control-panel__upper">
          <input placeholder="Фильмы" className="control-panel__title"></input>
          <button className="control-panel__search-button">Найти</button>
        </form>
        <div className="control-panel__bottom">
          <div
            onClick={() => {
              setIsSwitchActive(!isSwitchActive);
            }}
            className={
              !isSwitchActive
                ? 'control-panel__switch'
                : 'control-panel__switch_active'
            }
          >
            <div
              className={
                !isSwitchActive
                  ? 'control-panel__switch-circle'
                  : 'control-panel__switch-circle_active'
              }
            ></div>
          </div>
          <p className="control-panel__switch-title">Короткометражки</p>
        </div>
      </section>
    </>
  );
}

export default ControlPanel;
