import header from './components/header/header'
import garage from './components/garage/garage'
import winners from './components/winners/winners'

const body = document.querySelector('body')
const main = document.createElement('main')
body?.appendChild(main)
header()
garage()
winners()
