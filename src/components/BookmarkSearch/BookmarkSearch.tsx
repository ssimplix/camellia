import {
  Component, createRef, h, JSX,
} from 'preact';
import * as s from './BookmarkSearch.css';
import Bookmark from '../../bookmarks/Bookmark';
import { search } from '../../bookmarks/BookmarkManager';

export interface BookmarkSearchProps {
  hideSearchBar: () => void;
  updateSearchResults: (bookmarks: Promise<Bookmark[]>) => void;
}

export interface BookmarkSearchState {
}

export default class BookmarkSearch extends Component<BookmarkSearchProps, BookmarkSearchState> {
  searchField = createRef();

  componentDidMount(): void {
    document.addEventListener('keydown', this.escapeKeyPressHandler);
    document.addEventListener('keydown', this.characterKeyPressHandler);

    this.focusInput();
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.escapeKeyPressHandler);
    document.removeEventListener('keydown', this.characterKeyPressHandler);

    this.props.updateSearchResults(search(''));
  }

  private focusInput = (): void => {
    this.searchField.current.focus();
  };

  private characterKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key.length !== 1) {
      return;
    }

    this.focusInput();
  };

  private escapeKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.props.hideSearchBar();
    }
  };

  private resetHandler = () => {
    this.props.hideSearchBar();
  };

  private inputHandler = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    this.props.updateSearchResults(search(event.currentTarget.value));
  };

  render() {
    return (
      <form className={s.bookmarkSearch} onReset={this.resetHandler}>
        <input ref={this.searchField} type="search" placeholder="Start typing to search bookmarks..." className={s.bookmarkSearchField} onChange={this.inputHandler} />
        <button type="reset" className={s.bookmarkSearchCloseButton} title="Close search">Close search</button>
      </form>
    );
  }
}