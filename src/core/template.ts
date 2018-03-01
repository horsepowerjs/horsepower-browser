namespace hp.core {
  document.addEventListener('DOMContentLoaded', e => {
    Array.from(document.querySelectorAll<HTMLElement>('[hp-for]')).forEach(el => {
      template.templates.push({
        element: el, parent: <HTMLElement>el.parentElement
      })
      el.remove()
    })
  })

  export interface templateElement {
    element: Element
    parent?: Element
    data?: any
  }
  export class template {
    public static templates: templateElement[] = []

    public readonly template: templateElement

    public static add(tpl: string | Element, data?: any) {

      this.templates.push({ element: this.toTemplate(tpl), data })
    }

    public constructor(tpl: string | Element, parent?: Element, data?: any[] | Object) {
      this.template = {
        element: template.toTemplate(tpl),
        data: data,
        parent
      }
    }

    private static toTemplate(tpl: string | Element) {
      let element: Element
      if (typeof tpl == 'string') {
        element = document.createElement('div')
        element.innerHTML = tpl
      } else {
        element = tpl
      }
      return element
    }
  }
}