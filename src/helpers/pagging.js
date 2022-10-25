/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { pages } from 'constants';

export function getPagingData(total, page, limit) {
  const current_page = page > 0 ? page : 0;
  const total_pages = Math.ceil(total / limit);
  const prev_page = current_page - 1 <= 0 ? null : current_page - 1;
  const next_page = current_page * limit >= total ? null : current_page + 1;

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
  page = page < 0 ? 0 : page;

  const offset = page * limit;

  return { offset, limit };
}
