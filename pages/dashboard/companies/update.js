import useTranslation from 'next-translate/useTranslation'
import React, { useEffect } from 'react'
import { CurrentPageHeader } from '@/components/layouts'
import { Form } from '@/components/parts'
import { Company } from '@/components/ui'
import icoUpdate({ company }) {
  const { t } = useTranslation()
  return (
    <>
      <CurrentPageHeader icon={icons.Update} title={t('common:actions.update') + ' ' + t('common:models.company')} />
      <div className='content'>

        <Form>
          <Company company={company} />
        </Form>
      </div>
    </>
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

export default Update