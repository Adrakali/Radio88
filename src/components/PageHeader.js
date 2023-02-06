import React from 'react'

function PageHeader({title}) {
  return (
    <div className="bg-accent py-10 text-primary">
      <h1 className="mx-auto max-w-[1380px] text-6xl">{title}</h1>
    </div>
  );
}

export default PageHeader