import ProfileForm from "~/components/ProfileForm"
import { getProfileData } from "~/lib/actions"

export default async function SignupPage() {
  const { userData } = await getProfileData();
  const profileFormData = {
    firstName: userData.first_name,
    lastName: userData.last_name,
    state: userData.state,
    city: userData.city,
    street: userData.street,
    zipCode: userData.zip_code,
    acceptMail: userData.accept_mail
  }

  return (
    <div>
      <ProfileForm {...profileFormData} />
    </div>
  )
}
