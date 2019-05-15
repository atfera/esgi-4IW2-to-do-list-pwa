import { LitElement, html, css } from 'lit-element';

export default class AppTask extends LitElement {
  constructor() {
    super();
    this.id = null;
    this.task = "";
    this.description = "";
    this.dueDate = "";
    this.isDone = false;
  }

  firstUpdated() {
    this.shadowRoot.querySelector('.task-card')
      .addEventListener('load', () => {
        console.log('Loaded!');
    });
  }

  static get styles() {
    return css`
      .task-card td img {
        display: inline;
        width: 25px;
        margin: 5px 10px;
        cursor: pointer;
      }

      .done {
        text-decoration: line-through;
        background: lightgrey;
    `;
  }

  static get properties() {
    return {
      id: {
        type: String
      },
      task: {
        type: String
      },
      description: {
        type: String
      },
      dueDate: {
        type: String
      },
      isDone: {
        type: Boolean
      },
    };
  }

  initTask(id, task, description, dueDate, isDone) {
    this.id = id;
    this.task = task;
    this.description = description;
    this.dueDate = dueDate;
    this.isDone = isDone;
  }

  editTask() {
    const event = new CustomEvent('edit-task', {
      bubbles: true,
      composed: true,
      detail: {
        taskId: this.id,
      }
    });
    this.dispatchEvent(event);
  }

  deleteTask() {
    const event = new CustomEvent('delete-task', {
      bubbles: true,
      composed: true,
      detail: {
        taskId: this.id,
      }
    });
    this.dispatchEvent(event);
  }
  doneTask() {
    const event = new CustomEvent('done-task', {
      bubbles: true,
      composed: true,
      detail: {
        taskId: this.id,
      }
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
        <link rel="stylesheet" href="/styles/bootstrap.min.css">
        <tr class="task-card ${this.isDone? 'done' : 'not-done'}" data-toggle="tooltip" data-placement="top" title="${this.description}">
          <td>${this.task}</td>
          <td>${moment(this.dueDate).format("MMMM Do YYYY")}</td>
          <td>
            <button class="btn btn-outline-warning"
            @click=${this.editTask}>
              Edit task
            </button>
            <button class="btn btn-outline-danger"
            @click=${this.deleteTask}>
              Delete 
            </button>
            <button class="btn btn-outline-success"
            @click=${this.doneTask}>
              ${this.isDone ? 'Undo' : 'Done'}
            </button>
          </td>
        </tr>
      `;
  }
}

customElements.define('app-card', AppTask);