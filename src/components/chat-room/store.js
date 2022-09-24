import { defineStore } from 'pinia';


export const useStore = defineStore('message', {
  state: () => ({
      content: '',
      attachments: {},
      id: 0
  }),

  actions: {
    addAttachments(file) {
      this.attachments[this.id] = file;
      ++this.id;
    },
    removeAttachment(id) {
      delete this.attachments[id];
    },
  }
});