using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DmitrySundeevLINQ_Assignment_6
{
    public partial class Form1 : Form
    {
        DataClasses1DataContext myDataBirds = new DataClasses1DataContext();
        BindingSource myBindingUpdate = new BindingSource();
        

        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            myDisplayData();

        }

        private void myDisplayData() {

            BindingSource myBinding = new BindingSource();

            var myDataResults = from myBirds in myDataBirds.BirdCounts
                                where myBirds.Counted > 5
                                orderby myBirds.CountID ascending
                                select new {myBirds.CountID, myBirds.CountDate, myBirds.Counted, myBirds.Bird.Name };

            myBinding.DataSource = myDataResults;

            dataGridViewDirdsCount.DataSource = myBinding;

        }

        
        private void button2_Click(object sender, EventArgs e)
        {

            int x;
            if (Int32.TryParse(txtUpdateCounted.Text, out x))
            {
                myDataBirds.SubmitChanges();
                myDisplayData();
                txtUpdateCounted.Text = "SUBMITTED";
            }
            else
            {
                myBindingUpdate.CancelEdit();
                txtUpdateCounted.Clear();
                txtUpdateCounted.DataBindings.Clear();
            }

            //try
            //{
            //    //Validate();
            //    myBindingUpdate.MoveNext();
            //}
            //catch
            //{
            //    if (MessageBox.Show("Do you want to keep editing the record?", "Error",
            //        MessageBoxButtons.YesNo, MessageBoxIcon.Error) == DialogResult.No)
            //    {
            //        myBindingUpdate.CancelEdit();
            //        txtUpdateCounted.DataBindings.Clear();
            //    }
            //    else
            //    {
            //        foreach (Binding b in myBindingUpdate.CurrencyManager.Bindings)
            //        {
            //            b.WriteValue();
            //        }
            //    }
            //}

            

        }

        private void btDelete_Click(object sender, EventArgs e)
        {
            var t = dataGridViewDirdsCount.CurrentRow.Index;
            int value = Convert.ToInt32(dataGridViewDirdsCount.Rows[t].Cells[0].Value);

            DialogResult ds = MessageBox.Show("Are you sure?\n The row with Index=" + value + " will be deleted", "Confirm Deletion", MessageBoxButtons.YesNo);

            if (ds == DialogResult.Yes)
            {
                
                this.rowDelete(value);
                //MessageBox.Show(value.ToString());
            }
            else
            {
                MessageBox.Show("Deletion cancaled!");
            }
            
            
        }

        private void rowDelete(int selectedItem)
        {

            var selectedRow = (from myBirds in myDataBirds.BirdCounts
                               where myBirds.CountID == selectedItem
                               select myBirds).Single();

            
            myDataBirds.BirdCounts.DeleteOnSubmit(selectedRow);
            myDataBirds.SubmitChanges();
            myDisplayData();
            txtUpdateCounted.Text = "DELETED";


        }


        private void BindAndShow(int selectedItem)
        {

            var selectedRow = (from myBirds in myDataBirds.BirdCounts
                               where myBirds.Counted > 5 && myBirds.CountID == selectedItem
                               orderby myBirds.Counted descending
                               select myBirds).Single();

            myBindingUpdate.DataSource = selectedRow;

            txtUpdateCounted.Clear();
            txtUpdateCounted.DataBindings.Clear();
            txtUpdateCounted.DataBindings.Add("Text", myBindingUpdate, "Counted", true);

            
        }

        private void dataGridViewDirdsCount_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int value = Convert.ToInt32(((DataGridView)sender).Rows[e.RowIndex].Cells[0].Value);
            //MessageBox.Show(value.ToString());
            BindAndShow(value);
        }


        private void Form1_Load(object sender, EventArgs e)
        {

        }





    }
}
