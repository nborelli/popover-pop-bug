import { Component, h, Host, getElement } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  private popover!: HTMLElement;

  private positionPopover() {
    // Example of positioning the popover relative to the host element bounding box
    const hostEl = getElement(this);
    const rect = hostEl.getBoundingClientRect();
    const el = this.popover;
    el.style.top = `${rect.bottom}px`;
    el.style.left = `${rect.left}px`;
  }

  handleBeforeToggle = (e: ToggleEvent) => {
    if (e.newState == 'open') {
      console.log('show popover');
      this.positionPopover();
    } else {
      console.log('hide popover');
    }
  };

  private setPopoverRef = (el: HTMLElement) => {
    this.popover = el;
    if (el) {
      el.addEventListener('beforetoggle', this.handleBeforeToggle);
    } else {
      el.removeEventListener('beforetoggle', this.handleBeforeToggle);
    }
  };

  render() {
    return (
      <Host>
        <button popoverTarget="mypopover">Toggle Popover</button>
        <button onClick={() => this.popover.showPopover()}>Code - Show Popover</button>
        <button onClick={() => this.popover.hidePopover()}>Code - Hide Popover</button>
        <div id="mypopover" class="popover" popover="auto" ref={this.setPopoverRef} onBeforeToggle={this.handleBeforeToggle}>
          <slot />
        </div>
      </Host>
    );
  }
}
