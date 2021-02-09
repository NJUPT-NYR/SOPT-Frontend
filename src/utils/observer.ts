export default class Observer {
  private listeners = [];
  subscribe = (listener) => {
    this.listeners.push(listener);
  };
  dispatch = (value) => {
    this.listeners.forEach((listener) => {
      listener(value);
    });
  };
  unsubscribe = (listener) => {
    this.listeners = this.listeners.filter((one) => one !== listener);
  };
}
