import  Sidebar  from './components/side-bar/sidebar'
import Content from './components/content/content'

function App() {

  return (
    <>
     <div className="w-screen h-screen flex">
        <Sidebar />
        <Content />
      </div>
    </>
  )
}

export default App
