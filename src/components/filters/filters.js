import { connect } from 'react-redux';

import { setAllStops, setNoStops, setOneStop, setTwoStops, setThreeStops } from '../../redux/actions/actions';

import classes from './filters.module.scss';

function Filters({ stops, none, all, one, two, three }) {
  return (
    <div className={classes.filters}>
      <span className={classes['filters-header']}>Количество пересадок</span>
      <label className={classes.label}>
        <input type="checkbox" className={classes.input} checked={stops.all} onChange={all} />
        <span className={classes.customBox} />
        Все
      </label>
      <label className={classes.label}>
        <input type="checkbox" className={classes.input} checked={stops.noStops} onChange={none} />
        <span className={classes.customBox} />
        Без пересадок
      </label>
      <label className={classes.label}>
        <input type="checkbox" className={classes.input} checked={stops.oneStop} onChange={one} />
        <span className={classes.customBox} />1 пересадка
      </label>
      <label className={classes.label}>
        <input type="checkbox" className={classes.input} checked={stops.twoStops} onChange={two} />
        <span className={classes.customBox} />2 пересадки
      </label>
      <label className={classes.label}>
        <input type="checkbox" className={classes.input} checked={stops.threeStops} onChange={three} />
        <span className={classes.customBox} />3 пересадки
      </label>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { stops } = state;
  return { stops };
};

const mapDispatchToProps = (dispatch) => ({
  all: () => dispatch(setAllStops()),
  none: () => dispatch(setNoStops()),
  one: () => dispatch(setOneStop()),
  two: () => dispatch(setTwoStops()),
  three: () => dispatch(setThreeStops()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
