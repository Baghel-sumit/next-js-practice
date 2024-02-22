"use client"

const page = ({ params }: { params: any }) => {
  return (
    <div>
      <h1>profile</h1>
      <p>{params.id}</p>
    </div>
  )
}

export default page
