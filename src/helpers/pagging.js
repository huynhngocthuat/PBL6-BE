/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { pages } from 'constants';

export function getPagingData(total, currentPage, limit) {
  const total_pages = Math.ceil(total / limit);
  const current_page =
    // eslint-disable-next-line no-nested-ternary
    currentPage > total_pages ? null : currentPage > 0 ? currentPage : 0;
  const prev_page = current_page - 1 <= 0 ? null : current_page - 1;
  const next_page =
    // eslint-disable-next-line radix
    current_page * limit >= total ? null : parseInt(current_page) + 1;

  const pagination = {
    total_pages,
    prev_page,
    current_page,
    next_page,
    total_count: total,
  };

  return pagination;
}

export function getPagination(pagination) {
  let { page, limit } = pagination;

  limit = limit < 0 ? pages.LIMIT_DEFAULT : limit;
  page = page - 1 < 0 ? 0 : page - 1;

  const offset = page * limit;

  return { offset, limit };
}
