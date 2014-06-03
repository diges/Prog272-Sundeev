<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="AddDVD.aspx.cs" Inherits="DmitryDVD_Winter14.admin.AddDVD" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <h1>Add new DVD</h1>
    <p>
    <asp:Button ID="btnLogout" runat="server" OnClick="btnLogout_Click" Text="Logoff" />
    </p>

    <div class="hform">
        <asp:Label ID="dbErrorLabel" ForeColor="Red" runat="server" />
    </div>

    <div class="imgform">
        <asp:Image ID="Image1" runat="server" />
    </div>

    <div class="cform">
        <span>Title:</span>   <asp:TextBox ID="txtDVDtitle" runat="server" />
        <span>Artist:</span>  <asp:TextBox ID="txtDVDartist" runat="server" />
        <span>Rating:</span>  <asp:TextBox ID="txtDVDrating" runat="server" />
        <span>Price:</span>   <asp:TextBox ID="txtDVDprice" runat="server" />
        <span>Image URL:</span> <asp:TextBox ID="txtDVDimg" runat="server" OnTextChanged="txtDVDimg_TextChanged" />
    </div>
    <div class="errors">
        <asp:RequiredFieldValidator ID="txtDVDtitleValidator" runat="server" ControlToValidate="txtDVDtitle" ErrorMessage="DVDtitle is a required field" SetFocusOnError="true" ForeColor="Red"></asp:RequiredFieldValidator> <br />
        <asp:RequiredFieldValidator ID="txtDVDartistValidator" runat="server" ControlToValidate="txtDVDartist" ErrorMessage="DVDartist is a required field" SetFocusOnError="true" ForeColor="Red"></asp:RequiredFieldValidator><br />
        <asp:RequiredFieldValidator ID="txtDVDratingValidator" runat="server" ControlToValidate="txtDVDrating" ErrorMessage="DVDrating is a required field" SetFocusOnError="true" ForeColor="Red"></asp:RequiredFieldValidator><br />
        <asp:RequiredFieldValidator ID="txtDVDpriceValidator" runat="server" ControlToValidate="txtDVDprice" ErrorMessage="DVDprice is a required field" SetFocusOnError="true" ForeColor="Red"></asp:RequiredFieldValidator><br />

        <asp:RangeValidator ID="RangeValidator1" ControlToValidate="txtDVDrating" runat="server" ErrorMessage="Enter a valid range for Raiting field: 0-5" MinimumValue="0" MaximumValue="5" SetFocusOnError="true" ForeColor="Red"></asp:RangeValidator><br />

        <asp:CompareValidator ID="MoneyFieldValidator" runat="server"
            ControlToValidate="txtDVDprice" Type="Currency" Display="Dynamic" ForeColor="Red"
            ErrorMessage="Enter a valid money value, N.NN" Operator="DataTypeCheck"  SetFocusOnError="true" />
    </div>

    <div class="bform">
        <asp:Button ID="updateButton" Text="Clear" runat="server" OnClick="clearButton_Click" />
         <asp:Button ID="btnImg" runat="server" Text="Test Image" OnClick="btnImg_Click" />
        <asp:Button ID="btnAdd" runat="server" OnClick="btnAdd_Click" Text="Add New DVD" />
    </div>



   <!--  <div class="allerrors"> 
       <asp:ValidationSummary id ="vSummary" runat ="server" />
    </div>  -->

    <p>&nbsp;</p>
    <p>&nbsp;</p>




</asp:Content>
