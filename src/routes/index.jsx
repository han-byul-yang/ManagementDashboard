import { Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query'

import MainTodo from './MainTodo'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<MainTodo />} />
        </Routes>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
