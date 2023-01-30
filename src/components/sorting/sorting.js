import { connect } from 'react-redux';

import { setCheap, setFast, setOptimal } from '../../redux/actions/actions';

import classes from './sorting.module.scss';

function Sorting({ sortBy, cheap, fast, optimal }) {
  return (
    <div className={classes.sorting}>
      <button
        className={sortBy.cheap ? `${classes.btn} ${classes.active}` : classes.btn}
        type="button"
        aria-label="cheap"
        onClick={cheap}
        disabled={sortBy.cheap}
      >
        Самый дешевый
      </button>
      <button
        className={sortBy.fast ? `${classes.btn} ${classes.active}` : classes.btn}
        type="button"
        aria-label="fast"
        onClick={fast}
        disabled={sortBy.fast}
      >
        Самый быстрый
      </button>
      <button
        className={sortBy.optimal ? `${classes.btn} ${classes.active}` : classes.btn}
        type="button"
        aria-label="optimal"
        onClick={optimal}
        disabled={sortBy.optimal}
      >
        Оптимальный
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { sort } = state;
  return { sortBy: sort };
};

const mapDispatchToProps = (dispatch) => ({
  cheap: () => dispatch(setCheap()),
  fast: () => dispatch(setFast()),
  optimal: () => dispatch(setOptimal()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
