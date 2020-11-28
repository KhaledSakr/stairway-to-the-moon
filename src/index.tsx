import { render } from 'react-dom'
import { Controller } from './controller'

document.addEventListener('DOMContentLoaded', () => {
  render(<Controller />, document.getElementById('app-container'))
})
