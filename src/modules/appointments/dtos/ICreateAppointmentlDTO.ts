export default interface ICreateAppointmentlDTO {
  user_id: string;
  hospital_id: string;
  expertise_id: string;
  title: string;
  doctor_price: number;
  total_price: number;
  date: Date;
}
