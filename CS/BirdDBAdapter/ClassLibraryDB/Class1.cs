using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibraryDB
{
    public class BirdsData
    {
        private const string connectString = @"Data Source=localhost\SQLEXPRESS;Initial Catalog = Birds;Integrated Security=SSPI";
        private const string sqlErrorMessage =
           "Database operation failed.  Please contact your System Administrator.";

        /// <summary>
        /// Retrive the BirdCount table information
        /// </summary>
        /// <returns>Dataset</returns>
        public static DataSet GetBirdInfo()
        {
            SqlDataAdapter birdsAdapter;
            DataSet birdsDataSet;

            try
            {
                birdsAdapter = new SqlDataAdapter();
                birdsDataSet = new DataSet();

                birdsAdapter.SelectCommand = new SqlCommand();
                birdsAdapter.SelectCommand.CommandText = "select * from  BirdCount";
                birdsAdapter.SelectCommand.Connection = new SqlConnection();
                birdsAdapter.SelectCommand.Connection.ConnectionString = connectString;

                birdsAdapter.Fill(birdsDataSet, "BirdsCoun");

                return birdsDataSet;
            }
            catch (SqlException sqlEx)
            {
                throw new ApplicationException(sqlErrorMessage);
            }
            catch (Exception ex)
            {
                throw ex;
            }



        }

        public static int UpdateData(DataSet myDataSet)
        {
            int rowCount;
            SqlDataAdapter DAdapter;

            DAdapter = new SqlDataAdapter();

            try
            {
                
                //Update
                DAdapter.UpdateCommand = new SqlCommand("update BirdCount set RegionID=@RegionID, BirderID=@BirderID, BirdID=@BirdID, CountDate=@CountDate, Counted=@Counted where CountID=@CountID");
                DAdapter.UpdateCommand.Connection = new SqlConnection(connectString);

                DAdapter.UpdateCommand.Parameters.Add("@RegionID", System.Data.SqlDbType.NVarChar,10).SourceColumn="RegionID";
                DAdapter.UpdateCommand.Parameters.Add("@BirderID",System.Data.SqlDbType.Int).SourceColumn="BirderID";
                DAdapter.UpdateCommand.Parameters.Add("@BirdID",System.Data.SqlDbType.NVarChar,20).SourceColumn="BirdID";
                DAdapter.UpdateCommand.Parameters.Add("@CountDate",System.Data.SqlDbType.SmallDateTime,4).SourceColumn="CountDate";
                DAdapter.UpdateCommand.Parameters.Add("@Counted",System.Data.SqlDbType.Int).SourceColumn="Counted";
                DAdapter.UpdateCommand.Parameters.Add("@CountID", System.Data.SqlDbType.Int).SourceColumn = "CountID";

                //Insert
                DAdapter.InsertCommand = new SqlCommand("insert into BirdCount (RegionID, BirderID, BirdID, CountDate, Counted)"+
                                                        "values (@RegionID, @BirderID, @BirdID, @CountDate, @Counted)", DAdapter.UpdateCommand.Connection);
                DAdapter.InsertCommand.Parameters.Add("@RegionID", System.Data.SqlDbType.NVarChar, 10).SourceColumn = "RegionID";
                DAdapter.InsertCommand.Parameters.Add("@BirderID", System.Data.SqlDbType.Int).SourceColumn = "BirderID";
                DAdapter.InsertCommand.Parameters.Add("@BirdID", System.Data.SqlDbType.NVarChar, 20).SourceColumn = "BirdID";
                DAdapter.InsertCommand.Parameters.Add("@CountDate", System.Data.SqlDbType.SmallDateTime, 4).SourceColumn = "CountDate";
                DAdapter.InsertCommand.Parameters.Add("@Counted", System.Data.SqlDbType.Int).SourceColumn = "Counted";
                
                //delete
                DAdapter.DeleteCommand = new SqlCommand("delete from BirdCount where CountID=@CountID", DAdapter.UpdateCommand.Connection);
                DAdapter.DeleteCommand.Parameters.Add("@CountID", System.Data.SqlDbType.Int).SourceColumn = "CountID";


                DAdapter.UpdateCommand.Connection.Open();
                rowCount = DAdapter.Update(myDataSet, "BirdsCoun");


                return rowCount;

            }
            catch (SqlException sqlEx)
            {
                throw new ApplicationException(sqlErrorMessage);
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                DAdapter.UpdateCommand.Connection.Close();

            }
        }

        public static int DeleteSelectedRow(DataSet myDataSet, int ID)
        {
            int rowCount;
            SqlDataAdapter DA;

            DA = new SqlDataAdapter();

            try
            {
                DA.DeleteCommand = new SqlCommand("delete from BirdCount where CountID=@CountID");
                DA.DeleteCommand.Connection = new SqlConnection(connectString);

                DA.DeleteCommand.Parameters.Add("@CountID", System.Data.SqlDbType.Int).Value = ID;

                DA.DeleteCommand.Connection.Open();
                rowCount = DA.DeleteCommand.ExecuteNonQuery();
                
                return rowCount;

            }
            catch (SqlException sqlEx)
            {
                throw new ApplicationException(sqlErrorMessage);
            }

            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                DA.DeleteCommand.Connection.Close();
            }
        }


         
    }
}
