import React from 'react'
import MainLayout from 'src/components/layout/Main'

type Props = {}

export default function JobExperience({}: Props) {
  return (
    <div>JobExperience</div>
  )
}

JobExperience.getLayout = (page: React.ReactNode) => (<MainLayout>{page}</MainLayout>)