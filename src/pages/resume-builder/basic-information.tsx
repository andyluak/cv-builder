import React from 'react'
import { useResumeContext } from 'src/context/ResumeContext';

export default function BasicInformation() {

  const { template, setTemplate, userInfo, setUserInfo } = useResumeContext();

  console.log(userInfo);

  return (
    <div>basic-information</div>
  )
}