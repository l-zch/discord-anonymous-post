import { defineStore } from 'pinia';


export const useStore = defineStore('message', {
  state: () => ({
      content: '',
      attachments: {},
      id: 0
  }),

  actions: () => ({
    addAttachments(file) {
      this.addAttachments[id] = file;
      ++this.id;
    },
    removeAttachment(id) {
      delete this.addAttachments[id];
    },
  })
});