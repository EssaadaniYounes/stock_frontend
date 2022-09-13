import React, { useEffect } from 'react'
import { CurrentPageHeader } from '../../../components/layouts'
import { Form } from '../../../components/parts'
import { Company } from '../../../components/ui'
import icons from '../../../data/iconsComponents'
import { fetch } from '../../../lib/fetch'

function update({ company }) {

  return (
    <div className=''>
      <CurrentPageHeader icon={icons.Update} title="Update company" />

      <Form>
        <Company company={company} />
      </Form>
    </div>
  )
}


export async function getServerSideProps(ctx) {
  const { data: company } = await fetch('companies', {
    token: ctx.req.cookies.token
  })
  return {
    props: {
      company
    }
  }

}

export default update