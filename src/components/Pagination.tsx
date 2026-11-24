interface PaginationProps {
  page: number
  totalPages: number
  setPage: (page: number) => void
}
const Pagination = ({page, totalPages, setPage}: PaginationProps) => {

  const decreasePage = () => {
    setPage(page - 1)
  }

  const increasePage = () => {
    setPage(page + 1)
  }

  return (
    <nav className="pagination-wrapper">
      <div className="factewp-pager">
        <button onClick={decreasePage} style={{
          visibility: page > 1 ? 'visible' : 'hidden'
        }}>←</button>
        <span>{page}</span>
        {page !== totalPages && <button onClick={increasePage}>→</button>}
      </div>
    </nav>
  )
}

export default Pagination
