import { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { DashBoardLayout } from '@/components/Dashboard/DashboardLayout'
import { DashboardNote } from '@/components/Dashboard/DashboardNote'


const Dashboard: NextPage = () => {
  return (
    <Layout>
      <DashBoardLayout>
        <DashboardNote />
      </DashBoardLayout>
    </Layout>
  )
}

export default Dashboard
