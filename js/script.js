// Script di base per il progetto

const { createApp } = Vue;
const { DateTime } = luxon;

createApp({
  data() {
    return {
      contacts: [
        {
          name: 'Michele',
          avatar: './img/avatar_1.png',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Fabio',
          avatar: './img/avatar_2.png',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Samuele',
          avatar: './img/avatar_3.png',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro B.',
          avatar: './img/avatar_4.png',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro L.',
          avatar: './img/avatar_5.png',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received'
            }
          ],
        },
        {
          name: 'Claudia',
          avatar: './img/avatar_6.png',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Federico',
          avatar: './img/avatar_7.png',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Davide',
          avatar: './img/avatar_8.png',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'OK!!',
              status: 'received'
            }
          ],
        }
      ],
      showEmojiPicker: false,
      emojis: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊'], // Add more emojis as needed
      selectedContact: null,  // Rappresenta il contatto selezionato
      newMessage: '',         // Per tenere traccia del testo inserito dall'utente
      nameSearch: '',         // Per cercare un nome nella lista contatti
      dropdownIndex: null, // Indice del messaggio che ha il menu a tendina aperto
    };
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.nameSearch.toLowerCase())
      );
    },
    currentTime() {
      return DateTime.now().toFormat('HH:mm');
    }
  },
  methods: {
    selectContact(index) {
      this.selectedContact = this.contacts[index];
    },
    // Funzione per aggiungere un messaggio
    addMessage(messageText, status) {
      if (this.selectedContact) {
        this.selectedContact.messages.push({
          message: messageText,
          status: status,
          date: this.currentTime
        });
      }
    },
    // Funzione per inviare un messaggio
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        // Aggiungi il messaggio dell'utente
        this.addMessage(this.newMessage, 'sent');
        this.newMessage = '';

        // Risposta automatica dopo 1 secondo
        setTimeout(() => {
          this.addMessage('ok', 'received');
        }, 1000);
      }
    },
    formatDate(dateStr) {
      const dateTime = DateTime.fromFormat(dateStr, 'dd/MM/yyyy HH:mm:ss');
      return dateTime.isValid ? dateTime.toFormat('HH:mm') : dateStr;
    },
    addEmoji(emoji) {
      this.newMessage += emoji;
      this.showEmojiPicker = false;
    },
    toggleDropdown(index) {
      // Apri/chiudi il menu a tendina per il messaggio selezionato
      if (this.dropdownIndex === index) {
        this.dropdownIndex = null; // Chiude il menu se già aperto
      } else {
        this.dropdownIndex = index; // Apre il menu
      }
    },
    deleteMessage(messageIndex) {
      // Rimuovi il messaggio selezionato
      this.selectedContact.messages.splice(messageIndex, 1);

      // Se non ci sono più messaggi, rimuovi il contatto dalla lista e resetta la visualizzazione
      if (this.selectedContact.messages.length === 0) {
        const contactIndex = this.contacts.indexOf(this.selectedContact);
        this.contacts.splice(contactIndex, 1);
        this.selectedContact = null; // Imposta la finestra di default
      }

      // Chiudi il menu a tendina dopo aver eliminato il messaggio
      this.dropdownIndex = null;
    },
    getLastMessagePreview(contact) {
      const lastMessage = contact.messages[contact.messages.length - 1];
      return lastMessage ? lastMessage.message : 'Nessun messaggio';
    },
    getLastMessageTime(contact) {
      const lastMessage = contact.messages[contact.messages.length - 1];
      return lastMessage ? lastMessage.date : '';
    },
  },
  mounted() {
    this.selectedContact = this.contacts[0];
  }
}).mount('#app');
