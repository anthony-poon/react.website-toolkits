import React from "react";

import { CRUD } from "./components";

export const CustomCRUDInterface = ({
  title,
  items,
  search,
  onSearchChange,
  sortOptions,
  sortBy,
  onSortChange,
  isSortAsc,
  pageCount,
  currPage,
  onPageChange,
  schema,
  toolbarOptions,
  actionOptions,
  onToolbarAction,
  onEntityAction,
}) => {
  return (
    <CRUD.Interface
      title={title}
      items={items}
      toolbar={<CRUD.Toolbar options={toolbarOptions} onClick={onToolbarAction} />}
      searchBar={<CRUD.SearchBar value={search} onChange={onSearchChange} />}
      sortBar={<CRUD.SortBar options={sortOptions} isAsc={isSortAsc} value={sortBy} onChange={onSortChange} />}
      // TODO: Should not use index as key, maybe object hash?
      renderProperties={(item) => <CRUD.Property key={JSON.stringify(item)} item={item} schema={schema} />}
      renderActions={(item) => (
        <CRUD.ActionColumn options={actionOptions} onClick={(action) => onEntityAction(action, item)} />
      )}
      paginationBar={<CRUD.PaginationBar pageCount={pageCount} currPage={currPage} onChange={onPageChange} />}
    />
  );
};
