import { Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query'

import NavBar from 'components/NavBar'
import ConsoleBar from 'components/ConsoleBar'
import DashBoard from './DashBoard'
import Management from './Management'

import styles from './routes.module.scss'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <div className={styles.page}>
      <NavBar />
      <div className={styles.section}>
        <ConsoleBar />
        <main className={styles.main}>
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route path='/' element={<DashBoard />} />
                <Route path='management' element={<Management />} />
              </Routes>
            </QueryClientProvider>
          </RecoilRoot>
        </main>
      </div>
    </div>
  )
}

export default App
