import { render } from 'react-dom'
import { Controller } from './controller'

console.log('%cAre you trying to hack me? Try typing \'game\' in the console.', 'background: #e2e2e2; color: red; font-size: 16px');

document.addEventListener('DOMContentLoaded', () => {
  render(<Controller />, document.getElementById('app-container'))
})
