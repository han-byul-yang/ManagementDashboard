import { Routes, Route } from 'react-router-dom'

import NavBar from 'components/NavBar'
import ConsoleBar from 'components/ConsoleBar'
import DashBoard from './DashBoard'
import Management from './Management'

import styles from './Routes.module.scss'

const App = () => {
  return (
    <div className={styles.page}>
      <NavBar />
      <div className={styles.section}>
        <ConsoleBar />
        <main className={styles.main}>
          <Routes>
            <Route path='/' element={<DashBoard />} />
            <Route path='management' element={<Management />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
