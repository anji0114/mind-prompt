import { DashBoardLayout } from '@/components/Dashboard/DashboardLayout'
import { DashboardTemplate } from '@/components/Dashboard/DashboardTemplate'
import { Layout } from '@/components/Layout'

const Template = () => {
  return (
    <Layout>
      <DashBoardLayout>
        <DashboardTemplate />
      </DashBoardLayout>
    </Layout>
  )
}

export default Template
