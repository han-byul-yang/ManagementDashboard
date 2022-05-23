import { Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

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
          <RecoilRoot>
            <Routes>
              <Route path='/' element={<DashBoard />} />
              <Route path='management' element={<Management />} />
            </Routes>
          </RecoilRoot>
        </main>
      </div>
    </div>
  )
}

export default App
