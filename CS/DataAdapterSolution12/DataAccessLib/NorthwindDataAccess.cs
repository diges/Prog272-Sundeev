using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLib
{
    public static class NorthwindDataAccess
    {
        //Note:  If your server is not named localhost, you will need to change the connection string
        // private const string connectString = @"Server = localhost;Database=Northwind;Integrated Security=SSPI";
        private const string connectString = @"Server = localhost\sqlexpress;Database=NorthwindProg210;Integrated Security=SSPI";
        //private const string connectString = @"Server = localhost\MSSQLServer3;Database=NorthwindProg210;Integrated Security=SSPI";

        //private const string connectString = @"Server = lrumans-a255h\linda2005;Database=Northwind;Integrated Security=SSPI";

        // Generic error message for database issues
        private const string sqlErrorMessage = "Database operation failed.  Please contact your System Administrator";

        /// <summary>
        /// Retrieves list of customers from the Northwind database
        /// </summary>
        /// <param name="countryName">
        /// only customers from the specified country are retrieved if the string is not ""
        /// if the string is "" (zero length string) then all customers are retrieved
        /// </param>
        /// <returns>
        /// a DataTable containing  customer names
        /// </returns>
        public static DataTable GetCustomers(string countryName)
        {

            //DataAdapter
            SqlDataAdapter customerDataAdapter;

            //parameter object
            SqlParameter parm;

            //DataTable to hold customer list
            //We are using a DataTable rather than a DataSet
            //because we need only 1 table
            DataTable customerDataTable;


            try
            {

                // instantiate DataTable for Customer list
                customerDataTable = new DataTable();

                //instantiate the DataAdapter
                customerDataAdapter = new SqlDataAdapter();

                // instantiate the command 
                customerDataAdapter.SelectCommand = new SqlCommand();
              
                //Configure the command object

                //set up the connection for the command
                customerDataAdapter.SelectCommand.Connection = new SqlConnection();
                customerDataAdapter.SelectCommand.Connection.ConnectionString = connectString;
                //customerDataAdapter.SelectCommand.Connection.ConnectionString


                //set up sql for the command
                if (countryName == "")
                {
                    customerDataAdapter.SelectCommand.CommandText =
                        "Select CustomerID,CompanyName from Customers order by CompanyName";
                }
                else
                {
                    //set up the parameter
                    parm = new SqlParameter();
                    parm.ParameterName = "@CountryName";
                    parm.Value = countryName;

                    //add parm to Command's Parameter collection
                    customerDataAdapter.SelectCommand.Parameters.Add(parm);

                    //alternative code for setting up a parm
                    //selectCommand.Parameters.Add(new SqlParameter("@CountryName",countryName));

                    customerDataAdapter.SelectCommand.CommandText =
                        "Select CustomerID, CompanyName from Customers where Country= @CountryName order by CompanyName";
                }

                //use the DataAdapter to contact the database
                // note that the Fill method will open & close the connection
                // for you as well as sending the SQL to the database
                customerDataAdapter.Fill(customerDataTable);


                //return the DataTable
                return customerDataTable;

            }
            catch (SqlException sqlEx)
            {
                //here you might write details to an error log
                // that exists on a network server or in another database

                //note that we do not throw the original SQLException object
                //because the object contains information (server, database, etc.)
                //that we do not want to reveal
                throw new ApplicationException(sqlErrorMessage);
            }
            catch (Exception ex)
            {
                throw ex;
            }



        }


        /// <summary>
        /// This method retrieves data from 2 tables in the Northwind
        /// database and returns a dataset holding the 2 tables.
        /// </summary>
        /// <returns>a DataSet containing 2 tables
        /// that are related by a DataRelation
        /// </returns>
        public static DataSet GetOrders2()
        {
            // data adapter
            SqlDataAdapter northwindAdapter;
            //data set
            DataSet ordersDataSet;
            //relation
            DataRelation ordersDataRelation;

            //instantiate the data adapter
            northwindAdapter = new SqlDataAdapter();
            //instantiate the select command object
            northwindAdapter.SelectCommand = new SqlCommand();
            //instantiate the connection object
            northwindAdapter.SelectCommand.Connection = new SqlConnection();
            try
            {
                // set the connection string in the connection object
                northwindAdapter.SelectCommand.Connection.ConnectionString = connectString;
                //set the command text
                northwindAdapter.SelectCommand.CommandText =
                    "Select * from Orders order by OrderID";
                //instantiate the data set to be filled
                ordersDataSet = new DataSet("Orders DataSet");
                //contact the database
                //includes the connect and the sending of the SQL
                //and fill 1 table in the dataset
                northwindAdapter.Fill(ordersDataSet, "Orders");

                //now we wish to fill another table 
                //so we change the command text
                northwindAdapter.SelectCommand.CommandText =
                   "Select * from [Order Details] order by OrderID";
                //now we contact the database again
                // and add another table to the dataset
                northwindAdapter.Fill(ordersDataSet, "Order Details");

                //set up the relationship between the 2 tables
                ordersDataRelation = new DataRelation("UsefulRelation",
                    ordersDataSet.Tables["Orders"].Columns["OrderID"],
                    ordersDataSet.Tables["Order Details"].Columns["OrderID"]);

                ordersDataSet.Relations.Add(ordersDataRelation);

                return ordersDataSet;
            }
            catch (SqlException sqlEx)
            {
                //here you might write details to an error log
                // that exists on a network server or in another database

                //note that we do not throw the original SQLException object
                //because the object contains information (server, database, etc.)
                //that we do not want to reveal
                throw new ApplicationException(sqlErrorMessage);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        /// <summary>
        /// This method retrieves data from 2 tables in the Northwind
        /// database and returns a dataset holding the 2 tables.
        /// </summary>
        /// <returns>a DataSet containing 2 tables
        /// that are related by a DataRelation
        /// </returns>
        public static DataSet GetClients()
        {
            // data adapter
            SqlDataAdapter northwindAdapter;
            //data set
            DataSet ordersDataSet;
            //relation
            DataRelation ordersDataRelation;

            //instantiate the data adapter
            northwindAdapter = new SqlDataAdapter();
            //instantiate the select command object
            northwindAdapter.SelectCommand = new SqlCommand();
            //instantiate the connection object
            northwindAdapter.SelectCommand.Connection = new SqlConnection();
            try
            {
                // set the connection string in the connection object
                northwindAdapter.SelectCommand.Connection.ConnectionString = connectString;
                //set the command text
                northwindAdapter.SelectCommand.CommandText =
                    "select * from Customers order by CustomerID";
                //instantiate the data set to be filled
                ordersDataSet = new DataSet("Clients DataSet");
                //contact the database
                //includes the connect and the sending of the SQL
                //and fill 1 table in the dataset
                northwindAdapter.Fill(ordersDataSet, "Customers");

                //now we wish to fill another table 
                //so we change the command text
                northwindAdapter.SelectCommand.CommandText =
                   "select * from Orders order by OrderID";
                //now we contact the database again
                // and add another table to the dataset
                northwindAdapter.Fill(ordersDataSet, "Orders");

                //set up the relationship between the 2 tables
                ordersDataRelation = new DataRelation("UsefulRelation",
                    ordersDataSet.Tables["Customers"].Columns["CustomerID"],
                    ordersDataSet.Tables["Orders"].Columns["CustomerID"]);

                ordersDataSet.Relations.Add(ordersDataRelation);

                return ordersDataSet;
            }
            catch (SqlException sqlEx)
            {
                //here you might write details to an error log
                // that exists on a network server or in another database

                //note that we do not throw the original SQLException object
                //because the object contains information (server, database, etc.)
                //that we do not want to reveal
                throw new ApplicationException(sqlErrorMessage);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }



        /// <summary>
        /// This method retrieves data from 2 tables in the Northwind
        /// database and returns a dataset holding the 2 tables.
        /// </summary>
        /// <returns>a DataSet containing 2 tables 
        /// </returns>
        public static DataSet GetOrders()
        {
            // data adapter
            SqlDataAdapter northwindAdapter;
            //data set
            DataSet ordersDataSet;

            try
            {
                //instantiate the data adapter
                northwindAdapter = new SqlDataAdapter();
                //instantiate the select command object
                northwindAdapter.SelectCommand = new SqlCommand();
                //instantiate the connection object
                northwindAdapter.SelectCommand.Connection = new SqlConnection();

                // set the connection string in the connection object
                northwindAdapter.SelectCommand.Connection.ConnectionString = connectString;
                //set the command text
                northwindAdapter.SelectCommand.CommandText =
                    "Select * from Orders";
                //open the connection
                //northwindAdapter.SelectCommand.Connection.Open();
                //instantiate the data set to be filled
                ordersDataSet = new DataSet("Orders DataSet");

                //contact the database
                //includes the connect and the sending of the SQL
                //and fill 1 table in the dataset
                northwindAdapter.Fill(ordersDataSet, "Orders");

                //now we wish to fill another table 
                //so we change the command text
                northwindAdapter.SelectCommand.CommandText =
                   "Select * from [Order Details]";
                //now we contact the database again
                // and add another table to the dataset
                northwindAdapter.Fill(ordersDataSet, "Order Details");

                return ordersDataSet;
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



    }
}
