import {useState} from 'react';
import {SortType} from '../../types/sortType.ts';
import {SortTypeNames} from '../../const.ts';

type SortingProps = {
  activeSort: SortType;
  onChange: (sort: SortType) => void;
};

export default function Sorting({activeSort, onChange}: SortingProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const handleSelect = (sort: SortType) => {
    onChange(sort);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened((v) => !v)}
      >
        {SortTypeNames[activeSort]}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      <ul
        className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}
      >
        {Object.values(SortType).map((sort) => (
          <li
            key={sort}
            className={`places__option ${sort === activeSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSelect(sort)}
          >
            {SortTypeNames[sort]}
          </li>
        ))}
      </ul>
    </form>
  );
}
