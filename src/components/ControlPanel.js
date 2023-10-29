import React from 'react';
function ControlPanel() {
  const [isSwitchActive, setIsSwitchActive] = React.useState(false);
  return (
    <>
      <section className="controlPanel">
        <div className="controlPanel__upper">
          <h2 className="controlPanel__title">Фильмы</h2>
          <button className="controlPanel__search-button">Найти</button>
        </div>
        <div className="controlPanel__bottom">
          <div
            onClick={() => {
              setIsSwitchActive(!isSwitchActive);
            }}
            className={
              !isSwitchActive
                ? 'controlPanel__switch'
                : 'controlPanel__switch_active'
            }
          >
            <div
              className={
                !isSwitchActive
                  ? 'controlPanel__switch-circle'
                  : 'controlPanel__switch-circle_active'
              }
            ></div>
          </div>
          <p className="controlPanel__switch-title">Короткометражки</p>
        </div>
      </section>
    </>
  );
}

export default ControlPanel;
