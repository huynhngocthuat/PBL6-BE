class StatisticRequest {
  constructor({ status, total }) {
    this.status = status;
    this.total = total || 0;
  }
}

export default StatisticRequest;
