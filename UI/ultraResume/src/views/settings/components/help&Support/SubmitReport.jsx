import { useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate"
import useAuth from "../../../../hooks/useAuth";
import FailedMsg from "../../../../utils/messages/FailedMsg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reportSchema } from "../../../../utils/schemas/ReportSchema";
const SubmitReport = () => {
  const [success, setSuccess] = useState(false)
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate  = useAxiosPrivate();
  const { auth } = useAuth();
  const userId = auth?.userId;

  const { register, handleSubmit, formState: {errors}, reset, watch} = useForm({
      resolver: yupResolver(reportSchema),
      defaultValues:{
        reportType: "Bug Report"
      }
  })

  const handleSubmitReport = async (data) => {
    console.log("Form Submitted: ", data);
    try{
        const response = await axiosPrivate.post(
          `/users/reports/${userId}`, 
          JSON.stringify({reportType: data.reportType, description: data.description}),
          {headers: {"Content-Type": "application/json"}}
        );
        console.log(response.data);
        if(response.status === 200){
          setSuccess(true);
          reset()
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
    }catch(err){
      if(!err?.response){
          setErrMsg("No Server response");
      }else if(err.response?.status === 400){
          setErrMsg("Failed to send report");
      }
    }
  };

  return (
    <section className="p-4 font-montserrat">
      <h2 className="text-lg font-semibold mb-4">Submit a Report</h2>
      
      <form onSubmit={handleSubmit(handleSubmitReport)} className="space-y-4">
        <div className={`flex items-center relative top-3 justify-center ${success ? "flex" : "hidden"}`}>
            {success ? 
              <div className="bg-[#00FF94] flex flex-col items-center justify-center py-2 w-[280px] xs:w-[312px] sm:w-[385px] rounded-md">
                <p className="text-white font-medium">Report Sent Successfully</p>
              </div> : 
              <FailedMsg errMsg={errMsg} />}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Report Type</label>
          <select
            className="w-full border border-[#ccc] rounded-md p-2"
            value={watch("reportType")}
            {...register("reportType")}
          >
            <option>Bug Report</option>
            <option>User Feedback</option>
            <option>System Performance</option>
            <option>Feature Request</option>
            <option>Security Issue</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-[#ccc] rounded-md p-2 h-24"
            placeholder="Describe the issue or feedback..."
            {...register("description")}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#2A5D9E] text-white py-2 px-4 rounded-md text-sm"
        >
          Submit Report
        </button>
      </form>
    </section>
  );
};

export default SubmitReport;
