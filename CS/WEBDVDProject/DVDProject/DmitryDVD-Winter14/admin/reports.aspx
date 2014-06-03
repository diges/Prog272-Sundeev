<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="reports.aspx.cs" Inherits="DmitryDVD_Winter14.admin.reports" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


    <h1>Reports Page</h1>

    <p>
    <asp:Button ID="ButtonLogout" runat="server" Text="Logoff" OnClick="ButtonLogout_Click" />
    </p>

    
       
    <div class="bform">
        <asp:Button ID="ButtonCustomers" Text="List Customers" runat="server" OnClick="ButtonCustomers_Click" />
        <asp:Button ID="OrdersButton" runat="server" Text="All Orders" OnClick="OrdersButton_Click" />
    </div>

    <!-- Datalist horisontal view withno more than 3 in a row -->
    <asp:DataList ID="CustomerReport" runat="server" RepeatColumns="3" RepeatDirection="Horizontal">
        <HeaderStyle BackColor="#333333" Font-Bold="True" Font-Size="Large" ForeColor="White"
                HorizontalAlign="Center" VerticalAlign="Middle"  />
        <HeaderTemplate> Customer Details</HeaderTemplate>

        <ItemStyle />
        <ItemTemplate>
                    <span>Customer ID:</span> <%#Eval("CustomerID") %><br />
                    <span>First Name:</span><%#Eval("FirstName") %><br /><span>Last Name:</span><%#Eval("LastName") %><br />
        </ItemTemplate>

       <AlternatingItemStyle BackColor="LightPink" />
        <AlternatingItemTemplate>
                    <span>Customer ID:</span> <%#Eval("CustomerID") %><br />
                    <span>First Name:</span><%#Eval("FirstName") %><br /><span>Last Name:</span><%#Eval("LastName") %><br />

        </AlternatingItemTemplate>

    </asp:DataList>
    <br />
    <br />


    <div class="bform">
        <asp:DropDownList ID="dropListClients" runat="server" OnSelectedIndexChanged="dropListClients_SelectedIndexChanged">
        </asp:DropDownList>
        <asp:Button ID="btSelectedItem" runat="server" Text="Filter Orders" OnClick="btSelectedItem_Click"/>
    </div>


    
    <br />


    <!-- Datalist wrapped in a table view -->

    <asp:DataList ID="OrdersReport" runat="server" >
        <HeaderTemplate> 

            <table cellpadding="0" cellspacing="0" style="border: solid 1px black;">
            <tr>
                <th class="HeaderStyle">Order Details</th>
            </tr>
            <tr>
                <td>
                    <table cellpadding="0" cellspacing="0" class="ItemStyle">
                        <tr class="hStyle">
                            <td class="RowStyle">Customer ID:</td>
                            <td class="RowStyle">Order ID</td>
                            <td class="RowStyle">DVD ID</td>
                            <td >DVD title</td>
                        </tr>

           </HeaderTemplate>

            <ItemTemplate>
                <tr>
                <td class="RowStyle"><%#Eval("CustomerID") %></td>
                <td class="RowStyle"><%#Eval("OrderID") %></td>
                <td class="RowStyle"><%#Eval("DVDID") %></td>
                <td ><%#Eval("DVDtitle") %></td>
                </tr>
            </ItemTemplate>
            <AlternatingItemTemplate>
                <tr class="alernativeRow">
                <td class="RowStyle"><%#Eval("CustomerID") %></td>
                <td class="RowStyle"><%#Eval("OrderID") %></td>
                <td class="RowStyle"><%#Eval("DVDID") %></td>
                <td ><%#Eval("DVDtitle") %></td>
                </tr>
            </AlternatingItemTemplate>

     
        <FooterTemplate>
                        
                    </table>
                </td>
            </tr>
        </table>
    </FooterTemplate>

    </asp:DataList>

    <br /><br /><br />




</asp:Content>
